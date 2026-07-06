import Friendship from "../models/Friendship.js";
import User from "../models/User.js";

export const sendFriendRequest = async (req, res) => {
  try {

    const sender = req.user._id;

    const { userId: receiver } = req.params;

    // User cannot send request to themselves
    if (sender.toString() === receiver) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a friend request to yourself",
      });
    }

    // Check receiver exists
    const user = await User.findById(receiver);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if friendship/request already exists
    const existingRequest = await Friendship.findOne({
      $or: [
        {
          sender,
          receiver,
        },
        {
          sender: receiver,
          receiver: sender,
        },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Friend request already exists or you are already friend sorry",
      });
    }

    // Create request
    const friendship = await Friendship.create({
      sender,
      receiver,
    });

    return res.status(201).json({
      success: true,
      message: "Friend request sent successfully",
      friendship,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    // get request id

    // find request

    // validate

    // check receiver

    // update status

    // save

    // return response
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    // get request id

    // find request

    // validate

    // delete request

    // return response
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    // find pending requests

    // populate sender

    // return response
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFriends = async (req, res) => {
  try {
    // get all accepted friendships

    // populate sender & receiver

    // return response
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFriend = async (req, res) => {
  try {
    // get friendship id

    // find friendship

    // authorization

    // delete friendship

    // return response
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};