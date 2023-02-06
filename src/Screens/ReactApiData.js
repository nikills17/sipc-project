import axios from "axios";
import { useQuery } from "react-query";

// const url = 'https://dummy.restapiexample.com/api/v1/employee/1';



const getData = async () => {
  return '{"status": "success","data": {"id": 1,"employee_name": "Tiger Nixon","employee_salary": 320800,"employee_age": 61,"profile_image": ""},"message": "Successfully! Record has been fetched."}';
}





export const useGetData = () => {
  const { status } = useQuery(['showsData'], getData)
  // const { status } = useQuery(["posts"], async () => await getData());
  // const {status} = useQuery(["user"]);
  console.log(status)
  return (status)
};

