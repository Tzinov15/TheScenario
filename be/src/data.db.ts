import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid_v4 } from 'uuid';

@Schema({
  collection: 'Data',
  autoCreate: true,
  // NOTE: Actually found that changing 'createdAt' to created led to ambiguity of what the field was (ie: is it a boolean? a state?)
  // I thought the original createdAt / updatedAt more clearly indicate what the field represents, a date, thus changing 'timestamps'
  // to the just be true to allow for the default property names
  timestamps: true,
})
export class Data {
  @Prop({ type: String, default: uuid_v4 })
  _id?: string;

  // NOTE: Updated this to 'content' since data was an overloaded word throughout the app
  @Prop({ type: String })
  content: string;

  // NOTE: Added a new field to the data model just to make the UI form a bit more interesting
  @Prop({ type: String })
  author: string;
}

export const DataSchema = SchemaFactory.createForClass(Data);

export const DataCollection = {
  name: Data.name,
  schema: DataSchema,
};

export const DataConnection = MongooseModule.forFeature(
  [DataCollection],
  'local',
);
