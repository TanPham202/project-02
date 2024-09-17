import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss';
import { debounce } from 'lodash';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import { toast } from 'react-toastify';

const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [sortBy, setSortBy] = useState("");
    const [sortField, setSortField] = useState("");

    const [dataExport, setDataExport] = useState([]);

    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async(page) => {
        let res = await fetchAllUser(page);
        if(res && res.data){
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEditUser(true);
    }

    const handleDeleteUser = (user) => {
        setDataUserDelete(user);
        setIsShowModalDelete(true);
    }

    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEditUser(false)
        setIsShowModalDelete(false)
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setListUsers(cloneListUsers);
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    }

    const handleSearch = debounce((e) => {
        let term = e.target.value;
        if (term){
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUsers(cloneListUsers);
        } else{
            getUsers(1);
        }
    }, 500) 

    const getUserExport = (event, done) => {
        let result = [];
        if(listUsers && listUsers.length > 0){
            result.push(["Id", "Email", "First name", "Last name"]);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }

    const handleImportCSV = (e) => {
        if(e.target && e.target.files && e.target.files[0]){
            let file = e.target.files[0];
            if(file.type !== "text/csv"){
                toast.error("Only accept CSV files!!!")
                return;
            }
            Papa.parse(file, {
                complete: function (results){
                    let rawCSV = results.data;
                    if(rawCSV.length > 0){
                        if(rawCSV[0] && rawCSV[0].length === 3){
                            if(rawCSV[0][0] !== "email" || rawCSV[0][1] !== "first_name" || rawCSV[0][2] !== "last_name"){
                                toast.error("Wrong format Header CSV file!")
                            }
                            else{
                                let result = [];
                                rawCSV.map((item, index) => {
                                    let obj = {};
                                    if(index > 0 && item.length === 3){
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                })
                                let cloneListUsers = _.cloneDeep(listUsers);
                                cloneListUsers = cloneListUsers.concat(result);
                                setListUsers(cloneListUsers);
                            }
                        } 
                        else{
                            toast.error("Wrong format CSV file!")
                        }
                    } 
                    else{
                        toast.error("Not found data on CSV file!")
                    }
                }
            })
        }
    }

    return (
        <>
            <div className='my-3 add-new'>
                <div className='group-btns'>
                    <>
                        <label htmlFor='test' className='btn btn-warning'> 
                            <i className='fa-solid fa-file-import'></i> 
                            Import 
                        </label>
                        <input id="test" type='file' hidden onChange={(e) => handleImportCSV(e)} />
                    </>
                    <>
                        <CSVLink filename={"user.csv"} className='btn btn-primary' data={dataExport} onClick={getUserExport} asyncOnClick={true}> 
                            <i className='fa-solid fa-file-arrow-down'></i> 
                            Export 
                        </CSVLink>
                    </>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}> 
                        Add new user 
                    </button>
                </div>
                <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}> 
                    Add new user 
                </button>
            </div>
            <div className='col-4 my-3'>
                <input className='form-control' placeholder='Search user by email...' onChange={(e) => handleSearch(e)} />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span> ID </span>
                                <span>
                                    <i className='fa-solid fa-arrow-down-long' onClick={() => handleSort("desc", "id")}> </i>
                                    <i className='fa-solid fa-arrow-up-long' onClick={() => handleSort("asc", "id")}> </i>
                                </span>
                            </div>
                        </th>
                        <th> Email </th>
                        <th>
                            <div className='sort-header'>
                                <span> First name </span>
                                <span>
                                    <i className='fa-solid fa-arrow-down-long' onClick={() => handleSort("desc", "first_name")}> </i>
                                    <i className='fa-solid fa-arrow-up-long' onClick={() => handleSort("asc", "first_name")}> </i>
                                </span>
                            </div> 
                        </th>
                        <th> Last name </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    { listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                        return(
                            <tr key = {`users-${index}`}>
                                <td> {item.id} </td>
                                <td> {item.email} </td>
                                <td> {item.first_name} </td>
                                <td> {item.last_name} </td>
                                <td>
                                    <button className='btn btn-warning mx-3' onClick={() => handleEditUser(item)}> 
                                        Edit 
                                    </button>
                                    <button className='btn btn-danger mx-3' onClick={() => handleDeleteUser(item)}> 
                                        Delete 
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ReactPaginate 
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModalAddNew 
                show = {isShowModalAddNew}
                handleClose = {handleClose}
                handleUpdateTable = {handleUpdateTable}
            />
            <ModalEditUser 
                show = {isShowModalEditUser}
                dataUserEdit = {dataUserEdit}
                handleClose = {handleClose}
                handleEditUserFromModal = {handleEditUserFromModal}
            />
            <ModalConfirm
                show = {isShowModalDelete}
                dataUserDelete = {dataUserDelete}
                handleClose = {handleClose}
                handleDeleteUserFromModal = {handleDeleteUserFromModal}
            />
        </>
    )
}

export default TableUsers