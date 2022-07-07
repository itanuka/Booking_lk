import React, { useState } from 'react'


const AdminOrderSearch = ({history}) => {

    const [keyword, setKeyword] = useState('');

        const AdminOrdersearchHandler = (e) =>{
            e.preventDefault()

            if(keyword.trim()){
                
                history.push(`/admin/orders/search/${keyword}`)
            }
            else{
                history.push('/admin/orders/')
            }
        }

  return(
    <div className="searchContainer">
    <div id="cover">
      <form onSubmit={AdminOrdersearchHandler}>
        <div className="tb">
          <div className="td">
            <input type="text" id="searchbar209" placeholder="Customer Name" className="sinput"  onChange={(e)=>setKeyword(e.target.value)} />
          </div>
          <button className="sbutton" type="submit">
            <i className="fa fa-search fa-3x" />
          </button>
        </div>
      </form></div>
  </div>
  )

}

export default AdminOrderSearch
