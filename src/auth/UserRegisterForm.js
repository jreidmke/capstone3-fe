import WriterRegisterForm from './WriterRegisterForm';
import PlatformRegisterForm from './PlatformRegisterForm';
import useTitle from '../hooks/useTitle';

function UserRegisterForm({register}) {
    useTitle("Registration Form")
    return(
        <div>
            <h1>PLATFORM</h1>
            <PlatformRegisterForm register={register}/>
            <h1>WRITER</h1>
            <WriterRegisterForm register={register}/>
        </div>
    )
};

export default UserRegisterForm;