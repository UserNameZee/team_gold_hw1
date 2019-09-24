package org.gold.stratego.database;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.gold.stratego.database.entities.MongoTest;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends MongoRepository<MongoTest, String> {

}