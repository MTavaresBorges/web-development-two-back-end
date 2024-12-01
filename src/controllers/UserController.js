import * as Yup from 'yup';
import UserService from '../services/UserService.js';

export default class UserController {
  static async index(req, res) {
    const users = await UserService.all();
    res.json({ users });
  }

  static async store(req, res) {
    const schema = Yup.object().shape({
      full_name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      const data = req.body;

      await schema.validate(data, { abortEarly: false });

      const user = await UserService.create(data);

      res.status(201).json(user);
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        return res.status(422).json({ errors: err.errors });
      }

      res.status(500).json({ message: err.message });
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.findById(parseInt(id));

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    try {
      const data = req.body;

      await schema.validate(data, { abortEarly: false });

      const { id } = req.params;

      const user = await UserService.update(parseInt(id), data);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.json(user);
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        return res.status(422).json({ errors: err.errors });
      }

      res.status(500).json({ message: err.message });
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.delete(parseInt(id));

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}