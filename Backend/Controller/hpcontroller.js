
const janhvi = require('../model/hpmodel.js');
const create = async (req , res ) => {
    try{
        const form = await janhvi.create(req.body);
        res.status(201).json(form);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
};
const Findall = async (req , res ) => {
    try{
        const forms = await janhvi.findAll();
        res.status(200).json(forms);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exist
    const user = await janhvi.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // success
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {Findall , create, loginUser};
