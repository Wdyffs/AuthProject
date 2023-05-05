import Form from './Form';
import {FormTypes} from '../../models/FormInput.model';

type Props = {
  formType: FormTypes;
};

const FormContainer = ({formType}: Props) => {
  return (
    <section className={"w-full h-full bg-mountain relative"}>
      <section
        className='fixed top-0 bottom-0 w-full flex items-center justify-center z-30 blur-none backdrop-blur-sm'
      >
        <Form formType={formType} key={formType}/>
      </section>
    </section>
  );
};

export default FormContainer;
