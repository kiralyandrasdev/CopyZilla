using AutoMapper;
using CopyZillaBackend.Application.Features.User.Commands.UpdateUserCommand;
using CopyZillaBackend.Application.ViewModels;
using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserVm>().ReverseMap();
            CreateMap<User, UpdateUserCommandOptions>().ReverseMap();
        }
    }
}