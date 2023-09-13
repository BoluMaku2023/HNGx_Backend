const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Person = require("../model/Person");

// Create a new person
const createPerson = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ status: false, message: "Please input person name" });
    }
    const person = await Person.create({ name });
    if (!person) {
      return res
        .status(500)
        .json({ status: false, message: "Error occured, person not created" });
    }
    res.status(201).json({
      status: true,
      message: "Person was created successfully",
      data: {
        person,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error person not created", error });
  }
};

// Get Person By Id
const getPersonById = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;

    // validate if the id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: false, message: "Sorry, Id is Invalid" });
    }
    const person = await Person.findById(id);
    if (!person) {
      return res
        .status(404)
        .json({ status: false, message: "Could not find person" });
    }
    res.status(200).json({
      status: true,
      message: "Success: Person found ",
      data: {
        person,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured, could not find person", error });
  }
};

// Update User
const updatePerson = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: false, message: "Error: Id or name is Invalid" });
    }

    const person = await Person.findByIdAndUpdate(id, { name }, { new: true });

    if (!person) {
      return res
        .status(404)
        .json({ status: false, message: "Could not find person" });
    }
    res.status(200).json({
      status: true,
      message: "Success: Person updated",
      data: {
        person,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error: Could not update person", error });
  }
};

// Delete User
const deletePerson = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: false, message: "Error: Id is Invalid" });
    }

    const person = await Person.findByIdAndDelete(id);
    if (!person) {
      return res
        .status(404)
        .json({ status: false, message: "Could not find person" });
    }
    res.status(204).json({
      status: true,
      message: "Success: Person was deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Error: Could not person", error });
  }
};

module.exports = {
  createPerson,
  getPersonById,
  updatePerson,
  deletePerson,
};
