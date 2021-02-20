import WriterRegisterForm from './WriterRegisterForm';
import PlatformRegisterForm from './PlatformRegisterForm';

function UserRegisterForm({register}) {
    return(
        <div>
            <h1>WRITER</h1>
            <WriterRegisterForm register={register}/>
            <h1>PLATFORM</h1>
            <PlatformRegisterForm register={register}/>
        </div>
    )
};

export default UserRegisterForm;