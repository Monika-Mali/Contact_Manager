import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import Spinner from '../../SpinnerComp/Spinner';
import { ContactServices } from '../../ContactServices/ContactServices';


const ViewContact = () => {
  let{contactID}=useParams()


 let[state , setState]= useState({
    loading:false,
    contact:{},
    errorMessage:""
  })
  useEffect(()=>{
    let promise = new Promise((res,rej)=>{
      setState({...state,loading:true})
      let response=ContactServices.getContact(contactID);
      res(response)
    })
    promise.then((res1)=>{
      setState({...state,loading:false,contact:res1.data});
      console.log(res1.data);
    }).catch(()=>{
      setState({...state,loading:false,errorMessage:alert("data not correct")})
    })
  },[contactID])
  let {loading,contact,errorMessage}=state;
  return (
    <>
    {/* <pre>{JSON.stringify(contact)}</pre> */}
    {/* <h2>{contactID}</h2> */}

    <section className='viewContact'>
      <div className="container">
        <div className="row">
          <p className='p-3 text-warning h4'>View Contact</p>
          <p className='fst-italic'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus error labore ullam magni, in voluptate veniam facere quod, sapiente optio neque incidunt eius non temporibus. Quo, laudantium repellendus. Voluptate, libero.</p>
        </div>
      </div>
    </section>

    {
      loading?<Spinner/>:<React.Fragment>
        {
          Object.keys(contact).length>0 &&

          <section className='view_contact my-3'>
          <div className="container align-items-center">
            <div className="row">
              <div className="col-md-4 my-3">
                <img src={contact.photo} alt="not found" className='contact_image img-fluid' />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <ul className="list-group">
                  <li className="list-group-item list-group-item-action">Name:{contact.name}</li>
                  <li className="list-group-item list-group-item-action">Contact:{contact.Contact}</li>
                  <li className="list-group-item list-group-item-action">Email:{contact.email}</li>
                  <li className="list-group-item list-group-item-action">Company:{contact.company}</li>
                  <li className="list-group-item list-group-item-action">Title:{contact.title}</li>
                  <li className="list-group-item list-group-item-action">Comapny group:{contact.groupId}</li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <Link to={'/'} className='btn btn-warning my-2'>Back</Link>
              </div>
            </div>
          </div>
        </section>
        }
      </React.Fragment>
    }
    </>
  )
}

export default ViewContact