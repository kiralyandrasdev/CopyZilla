using MediatR;

namespace CopyZillaBackend.Application.Mediator;

public interface IValidatableRequest<out TRequest> : IRequest<TRequest> { }