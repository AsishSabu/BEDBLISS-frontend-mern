import { Field } from 'formik';
import { FormValueType } from '../../../types/hotelInterface';

const Form3 = ({ values }: FormValueType) => {
  return (
    <div className="overflow-auto flex flex-col gap-2 h-full w-full items-start font-mono text-left">
      {/* <h2 className="text-Marine_blue font-black text-3xl tracking-[-2px]">
        Select you plan
      </h2>
      <p className="text-Cool_gray tracking-tighter self-start text-sm">
        Please select your plan
      </p>
      <div className="flex gap-4 w-full max-lg:flex-col">
        <label
          className={`${
            values.plan === 'Arcade'
              ? 'bg-Magnolia border-Purplish_blue border-[1px]'
              : ''
          }border-Light_gray border-[1px] overflow-hidden w-full min-h-[11rem] max-lg:min-h-0 cursor-pointer ease-in-out duration-200 hover:border-Purplish_blue rounded-lg`}>
          <Field type="radio" name="plan" value="Arcade" className="hidden" />
          <div className="w-full p-4 h-full gap-5 flex flex-col justify-between max-lg:flex-row max-lg:justify-start max-lg:items-center">
            <img
              src="./images/icon-arcade.svg"
              width={40}
              height={40}
              alt="arcade"
            />
            <div>
              <h4 className="text-Marine_blue font-semibold">Arcade</h4>
              <p className="text-Cool_gray tracking-tighter text-sm">
                {!values.yearly ? '$9/mo' : '$90/yr'}
              </p>
              {values.yearly && (
                <p className="text-Marine_blue font-semibold text-sm">
                  2 months free
                </p>
              )}
            </div>
          </div>
        </label>
        <label
          className={`${
            values.plan === 'Advanced'
              ? 'bg-Magnolia border-Purplish_blue border-[1px]'
              : ''
          }border-Light_gray border-[1px] overflow-hidden w-full min-h-[11rem] max-lg:min-h-0 cursor-pointer ease-in-out duration-200 hover:border-Purplish_blue rounded-lg`}>
          <Field type="radio" name="plan" value="Advanced" className="hidden" />
          <div className="w-full p-4 h-full gap-5 flex flex-col justify-between max-lg:flex-row max-lg:justify-start max-lg:items-center">
            <img
              src="./images/icon-advanced.svg"
              width={40}
              height={40}
              alt="advanced"
            />
            <div>
              <h4 className="text-Marine_blue font-semibold">Advanced</h4>
              <p className="text-Cool_gray tracking-tighter text-sm">
                {!values.yearly ? '$12/mo' : '$120/yr'}
              </p>
              {values.yearly && (
                <p className="text-Marine_blue font-semibold text-sm">
                  2 months free
                </p>
              )}
            </div>
          </div>
        </label>
        <label
          className={`${
            values.plan === 'Pro'
              ? 'bg-Magnolia border-Purplish_blue border-[1px]'
              : ''
          }border-Light_gray border-[1px] overflow-hidden w-full min-h-[11rem] max-lg:min-h-0 cursor-pointer ease-in-out duration-200 hover:border-Purplish_blue rounded-lg`}>
          <Field type="radio" name="plan" value="Pro" className="hidden" />
          <div className="w-full p-4 h-full gap-5 flex flex-col justify-between max-lg:flex-row max-lg:justify-start max-lg:items-center">
            <img
              src="./images/icon-pro.svg"
              width={40}
              height={40}
              alt="arcade"
            />
            <div>
              <h4 className="text-Marine_blue font-semibold">Pro</h4>
              <p className="text-Cool_gray tracking-tighter text-sm self-end">
                {!values.yearly ? '$15/mo' : '$150/yr'}
              </p>
              {values.yearly && (
                <p className="text-Marine_blue font-semibold text-sm">
                  2 months free
                </p>
              )}
            </div>
          </div>
        </label>
      </div>
      <div className=" bg-Magnolia flex gap-4 justify-center items-center w-full min-h-[4rem] rounded-lg">
        <h5
          className={`${
            !values.yearly ? 'text-Marine_blue' : ''
          } font-black text-Cool_gray`}>
          Monthly
        </h5>
        <label
          className={`${
            values.yearly ? 'after:translate-x-[30px]' : ''
          } cursor-pointer w-[60px] h-[30px] rounded-full relative after:absolute after:top-[4px] after:left-[4px] after:w-[22px] after:h-[22px] after:bg-white after:rounded-full after:duration-300 after:ease-in-out bg-Marine_blue`}>
          <Field
            type="checkbox"
            name="yearly"
            className="absolute left-4 top-2 hidden"
          />
        </label>
        <h3
          className={`${
            values.yearly ? 'text-Marine_blue' : ''
          } font-black text-Cool_gray`}>
          Yearly
        </h3>
      </div> */}
    </div>
  );
};

export default Form3;