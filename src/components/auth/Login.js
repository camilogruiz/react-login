import React from "react"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from "../../actions/authActions"
import { useForm } from "react-hook-form"
import { useTranslation } from 'react-i18next'
import './Login.css';

function Login() {
	const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: "onBlur"
  });
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const onSubmit = data => {
		const userData = data
		dispatch(authActions.login(userData, '/react-login'))
	};

	return (
		<div>
			<div>
				<div>
					<h3>{t('layout.login')}</h3>
					<p>{t('messages.noaccount')} <Link to="/register">{t('layout.register')}</Link></p>
				</div>
			</div>

			<div>
				<div>
					<form noValidate onSubmit={handleSubmit(onSubmit)} className="frm">
						{/* Email */}
						<div className="row">
							<label className="label" htmlFor="email">{t('data.email')}:</label>
							<div>
								<input
									type="email"
									id="email"
									name="name"
									{...register("email",
										{
											required: t("validations.required"),
											pattern: {
												value: /^\S+@\S+$/i,
												message: t("validations.emailpattern")
											}
										}
										)}
								/><br/ >
								{errors.email && <span className="alert" role="alert">{errors.email.message}</span>}
							</div>
						</div>

						{/* Password */}
						<div className="row">
							<label className="label" htmlFor="password">{t('data.password')}:</label>
							<div>
								<input
									type="password"
									id="password"
									{...register("password",
										{
											required: t("validations.required"),
											minLength: {
												value: 6,
												message: t("validations.sixminlenght")
											}
										}
									)}
								/><br/ >
								{errors.password && <span className="alert" role="alert">{errors.password.message}</span>}
							</div>
						</div>

						{/* Submit button */}
						<div>
							<div>
								<button className="buttons" disabled={!isDirty || !isValid} type="submit">
								<span>{t('layout.login')}</span>
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
