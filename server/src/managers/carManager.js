const Car = require('../model/Car');

exports.create = (Data) => Car.create(Data);

exports.getAll = async (name, type) => {
    let result = await Car.find().populate('owner').lean();
    if (name) {
        result = result.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    } else if (type) {
        result = result.filter(item => item.type.toLowerCase().includes(type.toLowerCase()));
    }

    return result;
};
exports.getById = async (carId) => await Car.findById(carId).lean();

exports.deleteItem = async (id) => {
    await Car.findByIdAndDelete(id).lean();
};
exports.edit = async (id, data) => {
    const result = await Car.findByIdAndUpdate(id, data, { new: true });
    result.save();
    return result;

};
exports.buy = async (id, userId) => {
    const bought = await Car.findById(id);

    if (bought.buyingList.includes(userId)) {
        throw new Error('Product is alredy bought!');
    }

    bought.buyingList.push(userId);
    return bought.save();
};
