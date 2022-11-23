import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);


    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-tawny-xi.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch {
            }
        }
    })

    const closeModal = () => {
        setDeletingDoctor(null)
    }

    const handleDeleteDoctor = (doctor) => {
        console.log(doctor)
        fetch(`https://doctors-portal-server-tawny-xi.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`Doctor ${doctor.name} deleted successfully`)
                    refetch();
                }
            })
    }

    console.log(doctors)

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h2 className='text-4xl my-5'>Manage Doctors {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) =>
                                <tr key={doctor._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                                <img src={doctor.image} alt="Tailwind-CSS-Avatar-component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>
                                        <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm bg-red-600 border-0 text-white hover:bg-red-700">Delete</label>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure, you want to delete: ${deletingDoctor.name}`}
                    message={`If you delete, ${deletingDoctor.name}'s information will be lost permanently.`}
                    successAction={handleDeleteDoctor}
                    successButtonName="delete"
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;