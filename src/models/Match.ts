import {Model, model, Schema, Document} from 'mongoose';

/*----------------
 * Types
 *----------------*/

export interface Match {
  city: string;
  date: Date;
  teamA: string;
  teamB: string;
}

export interface MatchDocument extends Match, Document {
}

/*----------------
 * Base Schema
 *----------------*/

const schema = new Schema<Match>({
  city: {type: String, required: true},
  date: {type: Date, required: true},
  teamA: {type: String, required: true},
  teamB: {type: String, required: true},
});


/*----------------
 * Export
 *----------------*/

export let MatchModel: Model<MatchDocument>;
try {
  MatchModel = model("Match");
} catch {
  MatchModel = model("Match", schema);
}
