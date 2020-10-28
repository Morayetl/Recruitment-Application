import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document{
  /**
   * Company who creap
   */
  creator: string;
  /**
   * Timestamp when message was received on server
   */
  timeStamp: Date;
  /**
   * (User)Senders id
   */
  from: string;
  /**
   * Message itself
   */
  message: string;
  /**
   * Message type
   */
  type: 'text'| 'image' | 'voice'; 
  /**
   * URL of image or voice mail where it will be saved
   */
  appliers: Array<string>
}

const MessageSchema: Schema<Message> = new Schema({
  timeStamp: { type: Date, required: true},
  from: { 
    type: String,
    required: true 
  },
  message: { 
    type: String,
    required: true, 
    maxlength: 50 
  },
  type: {
    type: String,
    enum: ['text', 'image', 'voice'],
    required: true
  },
  url: {
    type: String
  }
});

MessageSchema.obj.url.required = function() {
  return this.type === 'image' || this.type === 'voice';
};

export const MessageModel =  mongoose.model<Message>('Message', MessageSchema);