import { ErrorMessage, Field } from 'formik';

const Form2 = () => {
  return (
    <div className="overflow-auto flex flex-col gap-2 h-full w-full items-start font-mono text-left">
      <h2 className="text-Marine_blue font-black text-3xl tracking-[-2px]">
        Account Info
      </h2>
      <p className="text-Cool_gray tracking-tighter self-start text-sm">
        Please provide your email, username, and password
      </p>
      <label className="text-Marine_blue font-semibold" htmlFor="email">
        Email Address
      </label>
      <Field
        type="email"
        placeholder="e.g. royjoseph@gmail.com"
        id="email"
        name="email"
        className="border-Light_gray border-[1px] p-3 w-full rounded-xl"
      />
      <span className="text-Strawberry_red text-sm">
        <ErrorMessage name="email" />
      </span>
      <label className="text-Marine_blue font-semibold" htmlFor="user_name">
        User Name
      </label>
      <Field
        type="text"
        id="user_name"
        placeholder="e.g. roy1234"
        name="user_name"
        className="border-Light_gray border-[1px] p-3 w-full rounded-xl"
      />
      <span className="text-Strawberry_red text-sm">
        <ErrorMessage name="user_name" />
      </span>
      <label className="text-Marine_blue font-semibold" htmlFor="password">
        Password
      </label>
      <Field
        type="password"
        id="password"
        placeholder="password..."
        name="password"
        className="border-Light_gray border-[1px] p-3 w-full rounded-xl"
      />
      <span className="text-Strawberry_red text-sm">
        <ErrorMessage name="password" />
      </span>
    </div>
  );
};

export default Form2;