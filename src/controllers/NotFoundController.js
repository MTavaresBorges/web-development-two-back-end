export default class NotFoundController {
  static handle(req, res) {
    res.status(404).json({ error: 'Not found' });
  }
}
