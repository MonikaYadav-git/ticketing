import express, { Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
  BadRequestError,
} from '@littlebench/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publisher/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const existingTicket = await Ticket.findById(req.params.id);

    if (!existingTicket) throw new NotFoundError();

    if (existingTicket.userId !== req.currentUser.id)
      throw new NotAuthorizedError();

    if (existingTicket.orderId)
      throw new BadRequestError('Ticket is already reserved');

    const { title, price } = req.body;
    existingTicket.set({
      title: title,
      price: price,
    });
    await existingTicket.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: existingTicket.id,
      title: existingTicket.title,
      price: existingTicket.price,
      userId: existingTicket.userId,
      version: existingTicket.version,
    });

    res.status(200).send(existingTicket);
  }
);
export { router as updateTicketRouter };
