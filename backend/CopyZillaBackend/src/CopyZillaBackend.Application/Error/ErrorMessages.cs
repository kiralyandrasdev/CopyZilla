namespace CopyZillaBackend.Application.Error
{
    public static class ErrorMessages
    {
        public const string UsageLimitReached = "Unfortunately, you have run out of credits." +
             " If you would like to continue using this feature," +
             " wait for your credits to replenish or upgrade your CopyZilla plan.";
        public const string InstructionsMustNotBeNull = "Instructions must not be null if previous email is not provided";
        public const string ObjectiveMustNotBeNull = "Objective must not be null";
        public const string ObjectiveMustBeNull = "Objective must be null if previous email is not provided";
        public const string ToneMustNotBeNull = "Tone must not be null";
        public const string UserNotFound = "User does not exist";
        public const string TextMustNotBeNull = "Text must not be null";
        public const string EmailMustNotBeNull = "Email must not be null";
        public const string FirebaseUidMustNotBeNull = "FirebaseUid must not be null";
        public const string FirebaseUidAlreadyExists = "FirebaseUid is already present in the database";
        public const string EmailAddressIsNotValid = "Email address is not valid";
        public const string UserIdMustNotBeNull = "UserId must not be null";
        public const string TemplateIdMustNotBeNull = "TemplateId must not be null";
        public const string TemplateNotFound = "Template does not exist";
        public const string TemplateContentMustNotBeEmpty = "Template content must not be empty";
        public const string TemplateTitleMustNotBeEmpty = "Template title must not be empty";
        public const string TemplateTitleTooLong = "Template title must not be longer than 200 characters";
        public const string TemplateContentTooLong = "Template content must not be longer than 10000 characters";
        public const string TemplateLimitReached = "You have reached the limit of maximum 500 templates. " +
            "Please delete some of them to add new ones.";
        public const string UserHasNoPlanAssigned = "The user has no CopyZilla plan assigned.";
        public const string PlanNeedsActivation = "Please reactivate your CopyZilla plan.";
    }
}