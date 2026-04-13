import { supabase } from "@/integrations/supabase/client";

export const generateTicketId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'TDR-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const createReservation = async (data: {
  full_name: string;
  phone: string;
  email?: string;
  city?: string;
  ticket_category: string;
  quantity: number;
  total_price: number;
}) => {
  const ticket_id = generateTicketId();
  const qr_code_data = JSON.stringify({
    ticket_id,
    name: data.full_name,
    category: data.ticket_category,
    quantity: data.quantity,
    app: 'tempete-du-rire-2026',
    timestamp: new Date().toISOString(),
  });

  const { data: reservation, error } = await supabase
    .from('reservations')
    .insert({
      ...data,
      ticket_id,
      qr_code_data,
      payment_status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return reservation;
};

export const getInventory = async () => {
  const { data, error } = await supabase
    .from('ticket_inventory')
    .select('*')
    .order('price', { ascending: false });
  if (error) throw error;
  return data;
};

export const getReservations = async () => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const validateReservation = async (id: string) => {
  // First get the reservation to know category and quantity
  const { data: reservation, error: fetchError } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;
  if (reservation.payment_status === 'validated') throw new Error('Déjà validé');

  // Update inventory
  const { data: inventory, error: invError } = await supabase
    .from('ticket_inventory')
    .select('*')
    .eq('category', reservation.ticket_category)
    .single();

  if (invError) throw invError;
  if (inventory.sold + reservation.quantity > inventory.total) {
    throw new Error('Plus de billets disponibles dans cette catégorie');
  }

  const { error: updateInvError } = await supabase
    .from('ticket_inventory')
    .update({ sold: inventory.sold + reservation.quantity })
    .eq('id', inventory.id);

  if (updateInvError) throw updateInvError;

  // Update reservation status
  const { error: updateError } = await supabase
    .from('reservations')
    .update({ payment_status: 'validated' })
    .eq('id', id);

  if (updateError) throw updateError;
};

export const rejectReservation = async (id: string) => {
  const { error } = await supabase
    .from('reservations')
    .update({ payment_status: 'rejected' })
    .eq('id', id);
  if (error) throw error;
};

export const cancelReservation = async (id: string) => {
  const { data: reservation, error: fetchError } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  if (reservation.payment_status === 'validated') {
    const { data: inventory, error: invError } = await supabase
      .from('ticket_inventory')
      .select('*')
      .eq('category', reservation.ticket_category)
      .single();

    if (invError) throw invError;

    const updatedSold = Math.max(0, inventory.sold - reservation.quantity);
    const { error: updateInvError } = await supabase
      .from('ticket_inventory')
      .update({ sold: updatedSold })
      .eq('id', inventory.id);

    if (updateInvError) throw updateInvError;
  }

  const { error } = await supabase
    .from('reservations')
    .update({ payment_status: 'cancelled' })
    .eq('id', id);

  if (error) throw error;
};

export const deleteReservation = async (id: string) => {
  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const scanTicket = async (ticketId: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('ticket_id', ticketId)
    .single();

  if (error) throw new Error('Billet non trouvé');
  if (data.payment_status !== 'validated') throw new Error('Paiement non validé');
  if (data.scanned) throw new Error('Billet déjà scanné');

  const { error: updateError } = await supabase
    .from('reservations')
    .update({ scanned: true, scanned_at: new Date().toISOString() })
    .eq('id', data.id);

  if (updateError) throw updateError;
  return data;
};
