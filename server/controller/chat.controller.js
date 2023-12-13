import Chatroom from "../models/chatroom.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";
import asyncHandler from "../middleware/asyncHandler.middleware.js";

/**
 * @GET_CHATROOM
 * @ROUTE @POST
 * @ACCESS login user only {{url}}/api/v1/chat/chatroom/get
 */

export const getChatroomId = asyncHandler(async (req, res, next) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return next(new AppError("sender and receiver both id is required", 400));
  }

  const isExist = await Chatroom.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (isExist) {
    return res.status(200).json({
      message: "chatroom already exist",
      chatroomId: isExist._id,
    });
  }

  const chatroom = new Chatroom({
    participants: [senderId, receiverId],
    unreadCounts: [{ user: senderId }, { user: receiverId }],
  });

  await chatroom.save();

  res.status(200).json({
    message: "chatroom created successfully",
    chatroomId: chatroom._id,
  });
});

/**
 * @GET_CONVERSATION
 * @ROUTE @POST
 * @ACCESS login user only {{url}}/api/v1/chat/messages/get
 */

export const getConversaton = asyncHandler(async (req, res, next) => {
  const { chatroomId } = req.body;

  const conversation = await Message.find({ chatroomId });

  if (!conversation) {
    return next(new AppError("no conversation found on this chatroom id", 400));
  }

  res.status(200).json(conversation);
});

/**
 * @GET_USERLIST
 * @ROUTE @GET
 * @ACCESS login user only {{url}}/api/v1/chat/users/list
 */

export const getUsersList = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json(users);
});

/**
 * @GET_COUNT_OF_UNREADED_MESSAGES
 * @ROUTE @POST
 * @ACCESS login user only {{url}}/api/v1/chat/unread-counts/get
 */

export const getUnreadCountList = asyncHandler(async (req, res, next) => {
  const { senderId } = req.body;

  if (!senderId) {
    return next(new AppError("sender id is required", 400));
  }

  const conversations = await Chatroom.find({
    participants: { $in: [senderId] },
  });

  if (!conversations) {
    return next(new AppError("no conversation found on this user", 400));
  }

  const unreadCounts = conversations.map((item) => {
    return item.unreadCounts.find((i) => i.user != senderId);
  });

  res.status(200).json(unreadCounts);
});

/**
 * @INCREASE_COUNT_OF_UNREADED_MESSAGES
 * @ROUTE @POST
 * @ACCESS login user only {{url}}/api/v1/chat/unread-counts/inc
 */

export const incUnreadCount = asyncHandler(async (req, res, next) => {
  const { user, chatroomId } = req.body;

  if (!user || !chatroomId) {
    return next(
      new AppError(
        "user and chatroom id required for increase the unread counts",
        400
      )
    );
  }

  await Chatroom.findOneAndUpdate(
    { "unreadCounts.user": user, _id: chatroomId },
    { $inc: { "unreadCounts.$.count": 1 } },
    { new: true }
  );

  res.status(200).json("count has been increased");
});

/**
 * @DECREASE_COUNT_OF_UNREADED_MESSAGES
 * @ROUTE @POST
 * @ACCESS login user only {{url}}/api/v1/chat/unread-counts/inc
 */

export const decUnreadCount = asyncHandler(async (req, res, next) => {
  const { user, chatroomId } = req.body;

  if (!user || !chatroomId) {
    return next(
      new AppError(
        "user or chatroom id is required for change the unread count",
        400
      )
    );
  }

  await Chatroom.findOneAndUpdate(
    { "unreadCounts.user": user, _id: chatroomId },
    { $set: { "unreadCounts.$.count": 0 } },
    { new: true }
  );

  res.status(200).json("count has been updated");
});
