import gql from 'graphql-tag'

export const CREATE_PATIENT = gql`
  mutation CreatePatient($input: PatientInput!) {
    createPatient(input: $input) {
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
    }
  }
`

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: AppointmentInput!) {
    createAppointment(input: $input) {
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

export const CREATE_STAFF = gql`
  mutation CreateStaff($input: StaffInput!) {
    createStaff(input: $input) {
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

export const CREATE_BILL = gql`
  mutation CreateBill($input: BillInput!) {
    createBill(input: $input) {
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