db.companies.aggregate([
  { $match: { "relationships.person": { $ne: null } } },
  {
    $project: {
      relationships: 1,
      _id: 0,
      name: 1
    }
  },
  { $unwind: "$relationships" },
  {
    $group: {
      _id: "$relationships.person",
      name: { $addToSet: "$name" },
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } },
  { $match: { $permalink: "eric-di-benedetto" } }
]);
