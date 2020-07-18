const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./merge');
  
module.exports = {
    events: async () => {
      try {
        const events = await Event.find();
        return events.map(event => {
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
    },

    createEvent: async (args, req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        place: args.eventInput.place,
        creator: req.userId
      });
      let createdEvent;
      try {
        const result = await event.save();
        createdEvent = transformEvent(result);
        const creator = await User.findById(req.userId);
  
        if (!creator) {
          throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
        await creator.save();
  
        return createdEvent;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    deleteEvent: async (args, req) => {
       if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const event = await Event.findById(args.eventId).populate('event');
        await Event.deleteOne({ _id: args.eventId });
        return event;
      } catch (err) {
        throw err;
      }
    },

  //   updateEvent: async (args, req) => {
  //     // if (!req.isAuth) {
  //      // throw new Error('Unauthenticated!');
  //    // }
  //    let updatedEvent;
  //    try {
  //     const event = await Event.findById(args.eventId)
  //      const result = await event.save();
  //     updatedEvent = transformEvent(result);
  //     const creator = await User.findById(req.userId);

  //     if (!creator) {
  //       throw new Error('User not found.');
  //     }
  //     creator.createdEvents.push(event);
  //     await creator.save();

  //     return updatedEvent;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }
  };

