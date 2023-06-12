import { AppProvider } from './context';
import './navbar.css';
import React, { useState, useRef, useEffect } from 'react'

import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from './context'
import sublinks from './data'

// import logo from './images/logo.svg';
import { FaBars } from 'react-icons/fa';
const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext()
  return (
    <div
      className={`${
        isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
      }`}
    >
      <aside className='sidebar'>
        <button className='close-btn' onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className='sidebar-links'>
          {sublinks.map((item, index) => {
            const { links, page } = item
            return (
              <article key={index}>
                <h4>{page}</h4>
                <div className='sidebar-sublinks'>
                  {links.map((link, index) => {
                    const { url, icon, label } = link
                    return (
                      <a key={index} href={url}>
                        {icon}
                        {label}
                      </a>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      </aside>
    </div>
  )
}

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();

  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    openSubmenu(page, { center, bottom });
  };
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains('link-btn')) {
      closeSubmenu();
    }
  };
  return (
    <nav className='nav' onMouseOver={handleSubmenu}>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={"Strip"} className='nav-logo' alt='' />
          <button className='btn toggle-btn' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              Medicine
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
            Personal Care
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              Baby and Child Care
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              Baby and Child Care
            </button>
          </li>
        </ul>
       
      </div>
    </nav>
  );
};

const Submenu = () => {
  const {
    isSubmenuOpen,
    page: { page, links },
    location,
  } = useGlobalContext()
  const container = useRef(null)
  const [columns, setColumns] = useState('col-2')
  useEffect(() => {
    setColumns('col-2')
    const submenu = container.current
    const { center, bottom } = location
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`

    if (links.length === 3) {
      setColumns('col-3')
    }
    if (links.length > 3) {
      setColumns('col-3')
    }
  }, [page, location, links])
  return (
    <aside
      className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`}
      ref={container}
    >
      <section>
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          {links.map((link, index) => {
            const { url, icon, label } = link
            return (
              <a key={index} href={url}>
                {icon}
                {label}
              </a>
            )
          })}
        </div>
      </section>
    </aside>
  )
}


function Menu() {
  return (
    <>
    <AppProvider>

      <Navbar />
      <Sidebar />
      {/* <Hero /> */}
      <Submenu />
    </AppProvider>

    </>
  );
}


//import React, { useState } from 'react';
//import './navbar2.css';
// const Menu = () => {
//   const [showWellnessSubMenu, setShowWellnessSubMenu] = useState(false);
//   const [showMedicineSubMenu, setShowMedicineSubMenu] = useState(false);


//   const toggleWellnessSubMenu = () => {
//     setShowWellnessSubMenu(!showWellnessSubMenu);
//   };
//   const toggleMedicineSubMenu = () => {
//     setShowMedicineSubMenu(!showMedicineSubMenu);
//   };

//   return (
//     <nav className="navbar">
//       <ul className="navbar-menu">
//         <li
//           className="navbar-item"
//           onMouseEnter={toggleWellnessSubMenu}
//           onMouseLeave={toggleWellnessSubMenu}
//         >
//           <a className="navbar-link">Wellness</a>
//           {showWellnessSubMenu && (
//            <div className="submenu-container">
//              <div className="submenu">
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column1</h4>
//                 <ul className="submenu-list">
//                   <li>Item1errrrrrrrrrrrr</li>
//                   <li>Item2reeeeeereeeee</li>
//                   <li>Item3errrrrrrrrrrrr</li>
//                 </ul>
//               </div>
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column2</h4>
//                 <ul className="submenu-list">
//                   <li>Item 4</li>
//                   <li>Item 5</li>
//                   <li>Item 6</li>
//                 </ul>
//               </div>
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column3</h4>
//                 <ul className="submenu-list">
//                   <li>Item 7</li>
//                   <li>Item 8</li>
//                   <li>Item 9</li>
//                 </ul>
//               </div>
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column 4</h4>
//                 <ul className="submenu-list">
//                   <li>Item 10</li>
//                   <li>Item 11</li>
//                   <li>Item 12</li>
//                 </ul>
//               </div>
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column 5</h4>
//                 <ul className="submenu-list">
//                   <li>Item 13</li>
//                   <li>Item 14</li>
//                   <li>Item 15</li>
//                 </ul>
//               </div>
//             </div>
//            </div>
//           )}
//         </li>
//         <li className="navbar-item"
//           onMouseEnter={toggleMedicineSubMenu}
//           onMouseLeave={toggleMedicineSubMenu}
//         >
//           <a className="navbar-link">Medicine</a>
//            {showMedicineSubMenu && (
//            <div className="submenu-container">
//              <div className="submenu">
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column1</h4>
//                 <ul className="submenu-list">
//                   <li>Item1errrrrrrrrrrrr</li>
//                   <li>Item2reeeeeereeeee</li>
//                   <li>Item3errrrrrrrrrrrr</li>
//                 </ul>
//               </div>
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column2</h4>
//                 <ul className="submenu-list">
//                   <li>Item 4</li>
//                   <li>Item 5</li>
//                   <li>Item 6</li>
//                 </ul>
//               </div>
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column3</h4>
//                 <ul className="submenu-list">
//                   <li>Item 7</li>
//                   <li>Item 8</li>
//                   <li>Item 9</li>
//                 </ul>
//               </div>
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column 4</h4>
//                 <ul className="submenu-list">
//                   <li>Item 10</li>
//                   <li>Item 11</li>
//                   <li>Item 12</li>
//                 </ul>
//               </div>
//               <div className="submenu-column">
//                 <h4 className="submenu-title">Column 5</h4>
//                 <ul className="submenu-list">
//                   <li>Item 13</li>
//                   <li>Item 14</li>
//                   <li>Item 15</li>
//                 </ul>
//               </div>
//             </div>
//            </div>
//           )}
//         </li>
//         <li className="navbar-item">
//           <a className="navbar-link">Beauty</a>
//         </li>
//         <li className="navbar-item">
//           <a className="navbar-link">Baby</a>
//         </li>
//       </ul>
//     </nav>
//   );
// };

export default Menu;




