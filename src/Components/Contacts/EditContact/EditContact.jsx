import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, } from 'react-router-dom'
import { ContactServices } from '../../ContactServices/ContactServices'
import Spinner from '../../SpinnerComp/Spinner'


const EditContact = () => {
   let nevigate= useNavigate()
  let {contactID}=useParams()
  let[state,setState]=useState({
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
  
  let updateInput =(event)=>{
    setState({...state,contact:{
      ...state.contact,
      [event.target.name]:event.target.value
    }})
  }

  let submitForm=(event)=>{
    event.preventDefault()
    let promises = new Promise((res,rej)=>{
      setState({...state,loading:true})
      let response=ContactServices.updateContact(contact,contactID)
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

  let {loading,contact,groups,errorMesage}=state;
  return (
    <>
    {/* <pre>{JSON.stringify(contact)}</pre> */}
    {
      loading?<Spinner/>:<React.Fragment>
        <section className='edit_contact'>
      <div className="container p-3">
        <div className="row">
          <p className='fw-bold h4 text-secondary'>Edit Contact</p>
          <p className='fst-italic'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, consequatur? ipsum, dolor sit amet consectetur adipisicing elit. Ab veniam consequatur sit facere modi debitis. </p>
        </div>
        <div className="row d-flex align-items-center">
          <div className='col-md-4 '>
            <form action="" onSubmit={submitForm}>
              <div className='mb-2'>
                <input type="text" name="name" id="" value={contact.name} onChange={updateInput} placeholder='Name' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="email" name="email" id="" value={contact.email} onChange={updateInput} placeholder='Email' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="tel" name="Contact" id="" value={contact.Contact} onChange={updateInput} placeholder='Contact'  maxLength={10} className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="text" name="photo" id="" value={contact.photo} onChange={updateInput} placeholder='Photo' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="text" name="company" id="" value={contact.company} onChange={updateInput} placeholder='Company-Name' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="text" name="title" id="" value={contact.title} onChange={updateInput} placeholder='Title' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="text" name="groupId" id="" value={contact.groupId} onChange={updateInput} placeholder='Company-group' className='form-control'/>
              </div>
              <div className='mb-2'>
                <input type="submit" value={"Update"} name="" id=""  className='btn btn-secondary button'/>
                <Link to={'/'} className='ms-2 btn btn-warning button'>Cancel</Link>
              </div>
            </form>
          </div>
          <div className='col-md-8'>
            <img src={contact.photo} alt="" className='contact_image img-fluid' />
          </div>
        </div>
      </div>
    </section>
      </React.Fragment>
    }
    </>
  )
}

export default EditContact
