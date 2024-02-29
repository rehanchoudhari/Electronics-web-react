import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { HomeIcon, CartIcon } from './icon';
import Search from './Search';

const Layout = ({ categories }) => {

    const renderCategories = () =>{
        return categories.data.map((c) => 
          <li key={c.id}><Link to={`/category/${c.id}`}> {c.title} </Link></li>
        );
      }
  return (
    <>
      <header>
        <div id='headerHomeIcon'>
          <Link to='/'><HomeIcon width={40}/></Link>
        </div>
        <Search />
        <div id='headerTitle'>
          E Store
        </div>
        <div id='headerCartIcon'>
          <Link to='/cart'><CartIcon width={40}/></Link>
        </div>
      </header>
      <section>
        <nav>
          {/* condition says if resultdata is there then else not */}
          { categories.errorMessage && <div>Error: Under maintaince {categories.errorMessage}</div> }
          <ul>
          { categories.data && renderCategories()}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </section>
      <footer>
        <div><Link to='/'>Home</Link>|<Link to='/cart'>Cart</Link></div>
      </footer>
    </>
  )
}

export default Layout;