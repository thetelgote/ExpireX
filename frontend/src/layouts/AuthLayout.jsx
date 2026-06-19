// import { Outlet } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiPackage, FiBell, FiShield, FiBarChart2 } from "react-icons/fi";

// function AuthLayout() {
//   return (
//     <div className="min-h-screen bg-paper dark:bg-ink">
//       <div className="grid min-h-screen lg:grid-cols-2">
//         {/* Left Section */}
//         <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-12 text-white">
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-lg"
//           >
//             <div className="mb-8 flex items-center gap-3">
//               <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
//                 <FiPackage size={34} />
//               </div>

//               <div>
//                 <h1 className="font-display text-4xl font-bold">
//                   Smart Inventory
//                 </h1>

//                 <p className="mt-1 text-white/80">
//                   Expiry Reminder System
//                 </p>
//               </div>
//             </div>

//             <h2 className="text-4xl font-bold leading-tight">
//               Manage Your Inventory Smarter
//             </h2>

//             <p className="mt-6 text-lg leading-8 text-white/90">
//               Track inventory, monitor expiry dates, receive instant
//               notifications, and reduce product waste using one powerful
//               dashboard.
//             </p>

//             <div className="mt-12 space-y-5">
//               <div className="flex items-center gap-4">
//                 <div className="rounded-xl bg-white/20 p-3">
//                   <FiPackage size={20} />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold">
//                     Product Management
//                   </h3>

//                   <p className="text-sm text-white/80">
//                     Add, edit and organize inventory easily.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="rounded-xl bg-white/20 p-3">
//                   <FiBell size={20} />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold">
//                     Smart Notifications
//                   </h3>

//                   <p className="text-sm text-white/80">
//                     Get alerts before products expire.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="rounded-xl bg-white/20 p-3">
//                   <FiBarChart2 size={20} />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold">
//                     Dashboard Analytics
//                   </h3>

//                   <p className="text-sm text-white/80">
//                     Monitor inventory through charts and reports.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="rounded-xl bg-white/20 p-3">
//                   <FiShield size={20} />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold">
//                     Secure Authentication
//                   </h3>

//                   <p className="text-sm text-white/80">
//                     Protected login and account management.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center justify-center px-5 py-10 sm:px-10">
//           <motion.div
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="
//               w-full
//               max-w-md
//               rounded-3xl
//               border
//               border-ink/5
//               bg-white
//               p-8
//               shadow-card
//               dark:border-paper/5
//               dark:bg-ink-soft
//               dark:shadow-card-dark
//             "
//           >
//             <Outlet />
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;





import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage, FiBell, FiShield, FiBarChart2 } from "react-icons/fi";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Section */}
        <div className="flex flex-col justify-center bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-10 text-white sm:px-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <div className="mb-6 flex items-center gap-3 lg:mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur lg:h-16 lg:w-16">
                <FiPackage size={26} className="lg:hidden" />
                <FiPackage size={34} className="hidden lg:block" />
              </div>

              <div>
                <h1 className="font-display text-2xl font-bold lg:text-4xl">
                  Smart Inventory
                </h1>

                <p className="mt-1 text-sm text-white/80 lg:text-base">
                  Expiry Reminder System
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold leading-tight lg:text-4xl">
              Manage Your Inventory Smarter
            </h2>

            <p className="mt-4 text-base leading-7 text-white/90 lg:mt-6 lg:text-lg lg:leading-8">
              Track inventory, monitor expiry dates, receive instant
              notifications, and reduce product waste using one powerful
              dashboard.
            </p>

            <div className="mt-8 hidden space-y-5 lg:mt-12 lg:block">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/20 p-3">
                  <FiPackage size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Product Management
                  </h3>

                  <p className="text-sm text-white/80">
                    Add, edit and organize inventory easily.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/20 p-3">
                  <FiBell size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Smart Notifications
                  </h3>

                  <p className="text-sm text-white/80">
                    Get alerts before products expire.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/20 p-3">
                  <FiBarChart2 size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Dashboard Analytics
                  </h3>

                  <p className="text-sm text-white/80">
                    Monitor inventory through charts and reports.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/20 p-3">
                  <FiShield size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Secure Authentication
                  </h3>

                  <p className="text-sm text-white/80">
                    Protected login and account management.
                  </p>
                </div>
              </div>
            </div>

            {/* Compact feature icons row, mobile/tablet only */}
            <div className="mt-6 flex gap-4 lg:hidden">
              <div className="rounded-xl bg-white/20 p-2.5">
                <FiPackage size={18} />
              </div>
              <div className="rounded-xl bg-white/20 p-2.5">
                <FiBell size={18} />
              </div>
              <div className="rounded-xl bg-white/20 p-2.5">
                <FiBarChart2 size={18} />
              </div>
              <div className="rounded-xl bg-white/20 p-2.5">
                <FiShield size={18} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-ink/5
              bg-white
              p-8
              shadow-card
              dark:border-paper/5
              dark:bg-ink-soft
              dark:shadow-card-dark
            "
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
