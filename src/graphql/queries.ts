import gql from 'graphql-tag'

export const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      firstName
      lastName
      dateOfBirth
      gender
      email
      phone
      address
      emergencyContact
      medicalHistory
      lastVisit
    }
  }
`

export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      id
      patientName
      doctorName
      date
      time
      type
      status
      notes
    }
  }
`

export const GET_STAFF = gql`
  query GetStaff {
    staff {
      id
      name
      role
      department
      specialization
      contact
      email
      schedule
      status
      qualifications
    }
  }
`

export const GET_BILLS = gql`
  query GetBills {
    bills {
      id
      patientName
      date
      items {
        description
        amount
      }
      totalAmount
      status
      paymentMethod
      notes
    }
  }
`