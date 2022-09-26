import React, { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import DatePicker from 'react-date-picker'
import Swal from 'sweetalert2';

export default function SupprimerCard({ tache, handleDelete }) {

  const handleDeleteL = () => {
    Swal.fire({
      title: 'Confirm?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimer',
          'Tache supprimer',
          'success'
        ).then(() => {
          handleDelete(tache)
        })
      }
    })
  }
  return (
    <div>
      <OverlayTrigger
        key='top'
        placement='top'
        overlay={
          <Tooltip id={`tooltip-top`}>
            <strong>Delete</strong>.
          </Tooltip>
        }
      >
        <img onClick={handleDeleteL} className='logos' src='../delete.png' />
      </OverlayTrigger>

    </div>
  )
}