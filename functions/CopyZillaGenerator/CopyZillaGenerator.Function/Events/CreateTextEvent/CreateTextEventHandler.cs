using System;
using System.Threading;
using System.Threading.Tasks;
using CopyZillaGenerator.Function.Services;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace CopyZillaGenerator.Function.Events.CreateTextEvent
{
    public class CreateTextEventHandler : IRequestHandler<CreateTextEvent, CreateTextEventResult>
    {
        private readonly IConfiguration _configuration;
        private readonly IOpenAIService _openAIService;

        public CreateTextEventHandler(IConfiguration configuration, IOpenAIService openAIService)
        {
            _configuration = configuration;
            _openAIService = openAIService;
        }

        public async Task<CreateTextEventResult> Handle(CreateTextEvent request, CancellationToken cancellationToken)
        {
            var result = new CreateTextEventResult();

            // Validate if create text options are valid
            var validator = new CreateTextEventValidator();
            var validationResult = validator.Validate(request);

            validationResult.Resolve(result);

            // If validation error occurs stop event and return response
            if (!result.Success) return result;

            result.Value = await _openAIService.GenerateText(request.Options);

            return result;
        }
    }
}