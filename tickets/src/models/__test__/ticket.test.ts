import { Ticket } from '../ticket';

it('implements optimistic currency control', async () => {
  //create instance of ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 10,
    userId: '123',
  });

  //save the ticket to the database
  await ticket.save();

  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //make two changes separately
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  //save the fetched ticket
  await firstInstance?.save();

  //save second ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (error) {
    return;
  }
  throw new Error('Should not reach this point');
});

it('implements the version number on multiple saves', async () => {
  //create instance of ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 10,
    userId: '123',
  });

  //save the ticket to the database
  await ticket.save();

  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);

  expect(firstInstance?.version).toEqual(0);

  //make two changes separately
  firstInstance!.set({ price: 10 });

  //save the fetched ticket
  await firstInstance?.save();

  expect(firstInstance?.version).toEqual(1);

  //save the fetched ticket
  await firstInstance?.save();

  expect(firstInstance?.version).toEqual(2);
});
