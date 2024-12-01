export default class AuthController {
  static async authenticate(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      const data = req.body;

      await schema.validate(data, { abortEarly: false });

      const token = await AuthService.authenticate(data);

      res.status(201).json({ token });
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        return res.status(422).json({ errors: err.errors });
      }

      res.status(500).json({ message: err.message });
    }
  }
}