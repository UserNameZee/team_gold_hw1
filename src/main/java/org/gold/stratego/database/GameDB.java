package main.java.org.gold.stratego.database;
import org.gold.stratego.database.GameRepository;
import org.gold.stratego.database.entities.Game;
import org.gold.stratego.database.entities.Turn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;

@Transactional
@Component
public class GameDB{

    @Autowired
    public GameRepository repo;

    /**
     * Gets the currently active game for the given user.
     * @param username
     * @return Game with key-value: "finished" = "false"
     *         Null if no active games
     *         or
     *         user is Anonymous
     */
    public Game getActiveGame(String username){
        if (username.equals("Anonymous"))
            return null;
        List<Game> games = repo.findActive(username);
        if (games.size() == 0)
            return null;
        return games.get(0);
    }

    /**
     * Finds all games associated with the current user's game history.
     * @param username
     * @return List of Game objects
     */
    public List<Game> findAllGames(String username){
        if (username.equals("Anonymous"))
            return null;
        List<Game> games = repo.findByUsername(username);
        return games;
    }

    /**
     * Updates the game in the Game DB
     * @param game
     */
    public void updateGame(Game game){
        repo.save(game);
    }

    public void addGame(Game game){
        repo.save(game);
    }





}