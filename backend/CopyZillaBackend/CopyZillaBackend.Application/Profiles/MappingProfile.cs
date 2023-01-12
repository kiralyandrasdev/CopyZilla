using AutoMapper;
using CopyZillaBackend.Application.ViewModels;
using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserVm>().ReverseMap();
        }
    }
}
