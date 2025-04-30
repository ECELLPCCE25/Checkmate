from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, EqualTo, Length, Optional, NumberRange

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class SignupForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=64)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

class ProfileForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    age = IntegerField('Age', validators=[DataRequired(), NumberRange(min=1, max=120)])
    gender = SelectField('Gender', choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], validators=[DataRequired()])
    height = FloatField('Height (cm)', validators=[DataRequired(), NumberRange(min=50, max=250)])
    weight = FloatField('Weight (kg)', validators=[DataRequired(), NumberRange(min=20, max=300)])
    user_category = SelectField('User Category', 
                              choices=[('fitness', 'Fitness-Conscious Individual'), 
                                      ('special_diet', 'Special Dietary Needs'), 
                                      ('motherhood', 'Motherhood'), 
                                      ('parenting', 'Parenting (Child Nutrition)')],
                              validators=[DataRequired()])
    dietary_preference = SelectField('Dietary Preference', 
                                  choices=[('vegetarian', 'Vegetarian'), 
                                          ('vegan', 'Vegan'), 
                                          ('non_vegetarian', 'Non-Vegetarian')],
                                  validators=[DataRequired()])
    calorie_goal = IntegerField('Daily Calorie Goal', validators=[Optional()])
    submit = SubmitField('Update Profile')

class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    subject = StringField('Subject', validators=[DataRequired()])
    message = TextAreaField('Message', validators=[DataRequired()])
    submit = SubmitField('Send Message')

class CategorySelectionForm(FlaskForm):
    user_category = SelectField('I am looking for:', 
                              choices=[('fitness', 'Fitness-Conscious Individual'), 
                                      ('special_diet', 'Special Dietary Needs'), 
                                      ('motherhood', 'Motherhood'), 
                                      ('parenting', 'Parenting (Child Nutrition)')],
                              validators=[DataRequired()])
    fitness_goal = SelectField('My fitness goal is:', 
                             choices=[('weight_gain', 'Weight Gain'), 
                                     ('weight_loss', 'Weight Loss'), 
                                     ('maintenance', 'Maintenance')],
                             validators=[Optional()])
    medical_condition = SelectField('I have:', 
                                 choices=[('diabetes', 'Diabetes'), 
                                         ('pcos', 'PCOS'), 
                                         ('pcod', 'PCOD'), 
                                         ('thyroid', 'Thyroid'), 
                                         ('hypertension', 'Hypertension'), 
                                         ('none', 'None')],
                                 validators=[Optional()])
    motherhood_stage = SelectField('I am:', 
                                choices=[('pre_natal', 'Pre-natal'), 
                                        ('pregnant', 'Pregnant'), 
                                        ('postpartum', 'Postpartum')],
                                validators=[Optional()])
    child_age = SelectField('My child is:', 
                          choices=[('0_1', '0-1 years'), 
                                  ('1_3', '1-3 years'), 
                                  ('3_5', '3-5 years'), 
                                  ('5_10', '5-10 years'), 
                                  ('10_plus', '10+ years')],
                          validators=[Optional()])
    submit = SubmitField('Continue')
