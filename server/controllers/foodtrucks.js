module.exports = {
  get(req, res) {
    console.log(req.params, req.query);
    res.end(req.toString());
  },
};
