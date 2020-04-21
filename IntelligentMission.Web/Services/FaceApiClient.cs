//using Microsoft.ProjectOxford.Face;
//using Microsoft.ProjectOxford.Face.Contract;
using Microsoft.Azure.CognitiveServices.Vision.Face;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligentMission.Web.Services
{
    public class FaceApiClient
    {
        private IFaceClient faceServiceClient;

        public FaceApiClient(FaceClient faceServiceClient)
        {
            this.faceServiceClient = faceServiceClient;
        }

        #region Person Groups

        public async Task<IEnumerable<PersonGroup>> GetPersonGroups()
        {
            var groups = await this.faceServiceClient.PersonGroup.ListAsync();
            return groups;
        }

        public async Task AddPersonGroup(PersonGroup group)
        {
            if (string.IsNullOrEmpty(group.PersonGroupId))
            {
                group.PersonGroupId = Guid.NewGuid().ToString();
            }

            await faceServiceClient.PersonGroup.CreateAsync(group.PersonGroupId, group.Name);
        }

        public async Task DeletePersonGroup(string personGroupId)
        {
            await faceServiceClient.PersonGroup.DeleteAsync(personGroupId);
        }

        public async Task TrainPersonGroup(string personGroupId)
        {
            await faceServiceClient.PersonGroup.TrainAsync(personGroupId);
        }

        public async Task<TrainingStatus> GetTrainingStatus(string personGroupId)
        {
            var trainingStatus = await faceServiceClient.PersonGroup.GetTrainingStatusAsync(personGroupId);
            return trainingStatus;
        }

        #endregion

        #region Persons

        public async Task<Person> AddPerson(string personGroupId, string personName)
        {
            var person = await faceServiceClient.PersonGroupPerson.CreateAsync(personGroupId, personName);
            return person;
        }

        public async Task<IEnumerable<Person>> GetPersonGroupPersonList(string personGroupId)
        {
            var personList = await faceServiceClient.PersonGroupPerson.ListAsync(personGroupId);
            return personList;
        }

        public async Task DeletePerson(string personGroupId, string personId)
        {
            await faceServiceClient.PersonGroupPerson.DeleteAsync(personGroupId, personId.ToGuid());
        }

        #endregion

        #region Faces

        public async Task<List<PersistedFace>> GetPersonFaces(string personGroupId, string personId)
        {
            var pId = new Guid(personId);
            var person = await faceServiceClient.PersonGroupPerson.GetAsync(personGroupId, pId);

            var personFaceList = new List<PersistedFace>();
            foreach (var faceId in person.PersistedFaceIds)
            {
                var face = await faceServiceClient.PersonGroupPerson.GetFaceAsync(personGroupId, pId, faceId);
                personFaceList.Add(face);
            }
            return personFaceList;
        }

        public async Task<Person> GetPerson(string personGroupdId, string personId)
        {
            var person = await this.faceServiceClient.PersonGroupPerson.GetAsync(personGroupdId, personId.ToGuid());
            return person;
        }

        public async Task<PersistedFace> GetPersonFace(string personGroupId, string personId, string faceId)
        {
            var face = await faceServiceClient.PersonGroupPerson.GetFaceAsync(personGroupId, personId.ToGuid(), faceId.ToGuid());
            return face;
        }

        public async Task<PersistedFace> AddPersonFace(string personGroupId, string personId, string faceUri)
        {
            var pId = new Guid(personId);
            var personFaceResult = await faceServiceClient.PersonGroupPerson.AddFaceFromUrlAsync(personGroupId, pId, faceUri, faceUri);
            return personFaceResult;
        }

        public async Task DeletePersonFace(string personGroupId, string personId, string faceId)
        {
            await faceServiceClient.PersonGroupPerson.DeleteFaceAsync(personGroupId, personId.ToGuid(), faceId.ToGuid());
        }

        #endregion

        #region Analysis Methods

        public async Task<IEnumerable<DetectedFace>> Detect(string imgUrl)
        {
            var faces = await this.faceServiceClient.Face.DetectWithUrlAsync(
                url: imgUrl,
                returnFaceAttributes: new[] {
                    FaceAttributeType.Gender,
                    FaceAttributeType.Smile,
                    FaceAttributeType.FacialHair,
                    FaceAttributeType.Glasses,
                    FaceAttributeType.Age,
                    FaceAttributeType.Emotion });
            return faces;
        }

        public async Task<IEnumerable<IdentifyResult>> Identify(string personGroupId, IEnumerable<Guid> faceIds)
        {
            var ids = faceIds.ToArray();
            return await this.faceServiceClient.Face.IdentifyAsync(ids, personGroupId);
        }
    }
    #endregion
}
