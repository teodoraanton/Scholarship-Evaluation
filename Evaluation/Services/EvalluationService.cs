using Evaluation.Models;
using Evaluation.Settings;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evaluation.Services
{
    public class EvalluationService : IEvalluationService
    {
        private readonly IMongoCollection<Evalluation> _eval;

        public EvalluationService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _eval = database.GetCollection<Evalluation>(settings.NoteCollectionName);
        }

        public async Task<bool> create(Evalluation model)
        {
            await _eval.InsertOneAsync(model);
            return true;
        }

        public async Task<bool> Delete(Guid id)
        {
            var result = await _eval.DeleteOneAsync(eval => eval.id == id);
            if (!result.IsAcknowledged && result.DeletedCount == 0)
            {
                return false;
            }
            return true;
        }

        public async Task<Evalluation> Get(Guid id)
        {
            return (await _eval.FindAsync(eval => eval.id == id)).FirstOrDefault();
        }

        public async Task<List<Evalluation>> GetAll()
        {
            var result = await _eval.FindAsync(eval => true);
            return result.ToList();
        }

        public async Task<bool> Update(Guid id, Evalluation model)
        {
            model.id = id;
            var result = await _eval.ReplaceOneAsync(eval => eval.id == id, model);
            if (!result.IsAcknowledged && result.ModifiedCount == 0)
            {
                await _eval.InsertOneAsync(model);
                return false;
            }

            return true;
        }
    }
}
