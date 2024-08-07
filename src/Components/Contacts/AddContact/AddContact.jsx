import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../ContactServices/ContactServices'

const AddContact = () => {
  let nevigate= useNavigate()
  let [state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo: "",
      Contact:"",
      email:"",
      company: "",
      title:"",
      groupId:""
    },
    groups:[],
    errorMesage:""
  })
  let updateInput =(event)=>{
    setState({...state,contact:{
      ...state.contact,
      [event.target.name]:event.target.value
    }})
  }

  let {loading,contact,groups,errorMesage}=state;

  let submitForm=(event)=>{
    event.preventDefault()
    let promises = new Promise((res,rej)=>{
      setState({...state,loading:true})
      let response=ContactServices.createContact(contact)
      res(response)
    })
    promises.then((res1)=>{
      if(res1){
        setState({...state,loading:false})
        nevigate("/contacts/list",{replace:true})
      }else{
        nevigate("/contacts/add",{replace:false})
      }
    }).catch(()=>{
      setState({...state,loading:false,errorMesage:alert("Contact not created!!!!")})
      
    })
  }
  
  return (
    <>
    {/* <pre>{JSON.stringify(contact)}</pre> */}
    <section className='add_contact'>
    <div className="container p-3">
      <div className="row">
          <p className='fw-bold h4 text-success'>Add Contact</p>
          <p className='fst-italic'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, consequatur? ipsum, dolor sit amet consectetur adipisicing elit. Ab veniam consequatur sit facere modi debitis. </p>
        </div>
        <div className="row">
        <div className='col-md-4 '>
            <form action="" onSubmit={submitForm}>
              <div className='mb-2'>
                <input type="text" name="name" required={true} value={contact.name} onChange={updateInput} id="" placeholder='Name' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="email" name="email" required={true} value={contact.email} onChange={updateInput}  id="" placeholder='Email' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="tel" name="Contact" required={true} value={contact.Contact} onChange={updateInput}  id="" placeholder='Contact'  maxLength={10} className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="text" name="photo" required={true} value={contact.photo} onChange={updateInput}  id="" placeholder='Photo' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="text" name="company" required={true} value={contact.company} onChange={updateInput}  id="" placeholder='Company-Name' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="text" name="title" required={true} value={contact.title} onChange={updateInput}  id="" placeholder='Title' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="text" name="groupId" required={true} value={contact.groupId} onChange={updateInput} id="" placeholder='Company-group' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="submit" value={"Add"} name="" id=""  className='btn btn-secondary'/>
                <Link to={'/'} className='ms-2 btn btn-warning'>Cancel</Link>
              </div>
            </form>
          </div>
          <div className='col-md-8 d-flex align-items-center'>
            <img src={contact.photo} alt="" className='img-fluid contact_image' />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default AddContact