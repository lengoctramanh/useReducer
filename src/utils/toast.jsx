import { toast } from 'react-toastify';
export const showToastError=(message)=> {
    toast.error(message)
}
export const showToastInfor=(message)=> {
toast.info(message)
}
export const showToastSuccess=(message)=> {
toast.success(message)
}