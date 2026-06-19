// const Item = require("../models/Item");
// const { calculateDaysLeft } = require("../utils/dateHelper");

// /*
// @desc    Add Item
// @route   POST /api/items
// @access  Private
// */
// const addItem = async (req, res) => {
//   try {
//     const {
//       itemName,
//       category,
//       quantity,
//       description,
//       expiryDate
//     } = req.body;

//     const item = await Item.create({
//       userId: req.user._id,
//       itemName,
//       category,
//       quantity,
//       description,
//       expiryDate
//     });

//     res.status(201).json({
//       success: true,
//       item
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// /*
// @desc    Get All Items
// @route   GET /api/items
// @access  Private
// */
// const getItems = async (req, res) => {
//   try {

//     const search = req.query.search || "";
//     const status = req.query.status || "";

//     let query = {
//       userId: req.user._id
//     };

//     if (search) {
//       query.itemName = {
//         $regex: search,
//         $options: "i"
//       };
//     }

//     let items = await Item.find(query);

//     items = items.map((item) => {
//       const daysLeft = calculateDaysLeft(
//         item.expiryDate
//       );

//       let itemStatus = "Active";

//       if (daysLeft < 0) {
//         itemStatus = "Expired";
//       } else if (daysLeft <= 30) {
//         itemStatus = "Expiring Soon";
//       }

//       return {
//         ...item.toObject(),
//         daysLeft,
//         status: itemStatus
//       };
//     });

//     if (status) {
//       items = items.filter(
//         (item) =>
//           item.status.toLowerCase() ===
//           status.toLowerCase()
//       );
//     }

//     res.json({
//       success: true,
//       count: items.length,
//       items
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// /*
// @desc    Get Single Item
// @route   GET /api/items/:id
// @access  Private
// */
// const getItemById = async (
//   req,
//   res
// ) => {
//   try {

//     const item =
//       await Item.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     res.json({
//       success: true,
//       item
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// /*
// @desc    Update Item
// @route   PUT /api/items/:id
// @access  Private
// */
// const updateItem = async (
//   req,
//   res
// ) => {
//   try {

//     const item =
//       await Item.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     const updatedItem =
//       await Item.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true
//         }
//       );

//     res.json({
//       success: true,
//       updatedItem
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// /*
// @desc    Delete Item
// @route   DELETE /api/items/:id
// @access  Private
// */
// const deleteItem = async (
//   req,
//   res
// ) => {
//   try {

//     const item =
//       await Item.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     await Item.findByIdAndDelete(
//       req.params.id
//     );

//     res.json({
//       success: true,
//       message:
//         "Item deleted successfully"
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   addItem,
//   getItems,
//   getItemById,
//   updateItem,
//   deleteItem
// };


const Item = require("../models/Item");
const { calculateDaysLeft } = require("../utils/dateHelper");

/*
@desc    Add Item
@route   POST /api/items
@access  Private
*/
const addItem = async (req, res) => {
  try {
    const {
      itemName,
      category,
      quantity,
      description,
      expiryDate
    } = req.body;

    const item = await Item.create({
      userId: req.user._id,
      itemName,
      category,
      quantity,
      description,
      expiryDate
    });

    res.status(201).json({
      success: true,
      item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
@desc    Get All Items
@route   GET /api/items
@access  Private
*/
const getItems = async (req, res) => {
  try {

    const search = req.query.search || "";
    const status = req.query.status || "";
    const category = req.query.category || "";
    const sortField = req.query.sortField || "expiryDate";
    const sortDir = req.query.sortDir || "asc";

    let query = {
      userId: req.user._id
    };

    if (search) {
      query.itemName = {
        $regex: search,
        $options: "i"
      };
    }

    // Filter by category directly in the DB query
    if (category) {
      query.category = {
        $regex: `^${category}$`,
        $options: "i"
      };
    }

    let items = await Item.find(query);

    items = items.map((item) => {
      const daysLeft = calculateDaysLeft(
        item.expiryDate
      );

      let itemStatus = "fresh";

      if (daysLeft < 0) {
        itemStatus = "expired";
      } else if (daysLeft <= 3) {
        itemStatus = "critical";
      } else if (daysLeft <= 7) {
        itemStatus = "soon";
      }

      return {
        ...item.toObject(),
        daysLeft,
        status: itemStatus
      };
    });

    // Status filter (computed field, so filtered in JS after mapping)
    if (status) {
      items = items.filter(
        (item) =>
          item.status.toLowerCase() ===
          status.toLowerCase()
      );
    }

    // Sorting
    const direction = sortDir === "desc" ? -1 : 1;

    items.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Name sort should be case-insensitive
      if (sortField === "itemName" || sortField === "name") {
        valA = (valA || "").toLowerCase();
        valB = (valB || "").toLowerCase();
      }

      // Date fields need to be compared as actual dates
      if (sortField === "expiryDate") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      if (valA < valB) return -1 * direction;
      if (valA > valB) return 1 * direction;
      return 0;
    });

    res.json({
      success: true,
      count: items.length,
      items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
@desc    Get Single Item
@route   GET /api/items/:id
@access  Private
*/
const getItemById = async (
  req,
  res
) => {
  try {

    const item =
      await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.json({
      success: true,
      item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
@desc    Update Item
@route   PUT /api/items/:id
@access  Private
*/
const updateItem = async (
  req,
  res
) => {
  try {

    const item =
      await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    const updatedItem =
      await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    res.json({
      success: true,
      updatedItem
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
@desc    Delete Item
@route   DELETE /api/items/:id
@access  Private
*/
const deleteItem = async (
  req,
  res
) => {
  try {

    const item =
      await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    await Item.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Item deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
};