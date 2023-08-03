const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://sharpviking:l9a53607@cluster0.0maezhz.mongodb.net/test')
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('could not connect to MongoDB...'));


const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { _id: false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'John',
        last: "Wick"
    })

    u.addresses.push({
        street: '123 Seasame St.',
        city: 'new York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)

}

const addresses = async (id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '469 Seasame St.',
            city: 'oregon',
            state: 'NY',
            country: 'USA'

        }
    )
    const res = await user.save()
    console.log(res);
}

addresses('64cbffaf4cd95971d41c9e5a');
makeUser();