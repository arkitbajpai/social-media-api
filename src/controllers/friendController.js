import Friendship from "../models/Friendship.js";
import User from "../models/User.js";

// Send Friend Request
export const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a friend request to yourself",
      });
    }

    const receiver = await User.findById(userId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existingRequest = await Friendship.findOne({
      $or: [
        {
          sender: req.user._id,
          receiver: userId,
        },
        {
          sender: userId,
          receiver: req.user._id,
        },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Friend request already exists",
      });
    }

    const request = await Friendship.create({
      sender: req.user._id,
      receiver: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Friend request sent",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Accept Friend Request
export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Friendship.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    request.status = "accepted";

    await request.save();

    return res.status(200).json({
      success: true,
      message: "Friend request accepted",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject Friend Request
export const rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Friendship.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend request rejected sorry! for the inconvinence ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Pending Requests
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await Friendship.find({
      receiver: req.user._id,
      status: "pending",
    }).populate("sender", "name email");

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Friends
export const getFriends = async (req, res) => {
  try {
    const friends = await Friendship.find({
      status: "accepted",
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id },
      ],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    return res.status(200).json({
      success: true,
      count: friends.length,
      friends,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Friend
export const removeFriend = async (req, res) => {
  try {
    const { friendshipId } = req.params;

    const friendship = await Friendship.findById(friendshipId);

    if (!friendship) {
      return res.status(404).json({
        success: false,
        message: "Friendship not found",
      });
    }

    const isSender =
      friendship.sender.toString() === req.user._id.toString();

    const isReceiver =
      friendship.receiver.toString() === req.user._id.toString();

    if (!isSender && !isReceiver) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await friendship.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};