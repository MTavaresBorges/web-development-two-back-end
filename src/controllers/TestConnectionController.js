export default class TestConnectionController {
  static handle(req, res) {
    res.json({ message: "Server is running!" });
  }
}