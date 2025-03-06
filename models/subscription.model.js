import mongoose from 'mongoose';


const subscriptionSchema= new mongoose.Schema({
name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minLength: 0,
    maxLength: 100

},
price: {
    type: Number,
    required: true,
    min: [0, 'Price must be greater than 0']
},
currencey:{
    type: String,
    enum: ['USD', 'INR'],
    default: 'INR'

},
frequency:{
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly']
},
category: {
    type: String,
    enum: ['sports', 'entertainment', 'ifestyle', 'technology', 'finance', 'politics', 'other'],
    required: true
},
paymentMethod:{
    type: String,
    required: true,
    trim: true
},
status:{
    type:String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'

},
startDate:{
    type: Date,
    required: true,
    validate: {
        validator: (value)=> value<= new Date(),
        message: 'Satrt date must be in past'
    }
},
renewalDate: {
    type: Date,
    validate:{
        validator: function(value){
            return value>this.startDate;
        },
        message: 'Renewam date must be after the start date'
    }
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    ndex: true
}

},{timestamps: true});

// middleware -> pre  schema.pre(event, fn)   event->save,validate, remove find

subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate= new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

    }


    if(this.renewalDate<new Date()){
        this.status='expired';
    }

    next();
});

const Subscription = mongoose.model('Subscription',subscriptionSchema );

export default Subscription;

