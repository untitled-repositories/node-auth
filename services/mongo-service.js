var config = require('../config/config');

exports.find = function(q, Collection, next){
    var query = Collection.find();
    query.where(q.args);
    if(q.populated_fields){
        for(var i = 0; i< q.populated_fields.length; i++){
            query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
        }
    }
    if(q.select){ query.select(q.select); }
    if(q.sort){ query.sort(q.sort); }
    if(q.limit){ query.limit(q.limit); }
    query.exec(function(err, array) {
        next(err, array);
    });
};

exports.findOne = function(q, Collection, next){
    var query = Collection.findOne();
    query.where(q.args);
    if(q.select){ query.select(q.select); }
    query.exec(function(err, entry) {
        next(err, entry);
    });
};

exports.findById = function(id, Collection, next) {
    Collection.findById(id, function(err, entry) {
        next(err, entry);
    });
};

exports.saveNew = function(object, Collection, next) {
    var newObject = new Collection(object);
    newObject.save(function(err, entry) {
        if (err) { return next({id: 1, message: 'error while saving entry'}); }
        next(err, entry);
    });
};

exports.update = function(q, Collection, next){
    var conditions = q.where;
    var update = q.update;
    var options = {new: true};
    if(q.select){ options.select = q.select; }
    var query = Collection.findOneAndUpdate(conditions, update, options);
    if(q.populated_fields){
        for(var i = 0; i< q.populated_fields.length; i++){
            query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
        }
    }
    query.exec(function(err, entry) {
        next(err, entry);
    });
};
